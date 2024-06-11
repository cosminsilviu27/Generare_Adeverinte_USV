import os
from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
import gspread
from google.oauth2.service_account import Credentials
from django.conf import settings
from rest_framework.views import APIView

from certificate.models import Certificate
from certificate.serializers import CertificateSerializer
from secretary_profile.models import SecretaryProfile
from student_profile.models import StudentProfile
from django.utils import timezone


def authenticate_with_google():
    credentials = Credentials.from_service_account_info(settings.GOOGLE_SERVICE_ACCOUNT_JSON)
    scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/spreadsheets.readonly'])
    gc = gspread.authorize(scoped_credentials)
    return gc


def validateCertificate(row):
    certificate = {'valid': True}  # Using a dictionary to store the validation status and data

    # Remove white spaces
    purpose = row['purpose'].strip()
    def_number = row['def_number'].strip()

    # Check full name length
    if len(purpose) <= 0 or len(def_number) <= 0:
        certificate['valid'] = False
        return certificate

    # Assigning attributes
    certificate['purpose'] = purpose
    certificate['registration_date'] = row['registration_date']
    certificate['student_data'] = {
        'email': row['student_email'],
        'full_name': row['student_full_name']
    }
    certificate['def_number'] = def_number

    return certificate


def validateCertificate1(row):
    certificate = {'valid': True}  # Using a dictionary to store the validation status and data

    # Remove white spaces
    purpose = row['purpose'].strip()
    rejection_motive = row['rejection_motive'].strip()

    # Check full name length
    if len(purpose) <= 0 or len(rejection_motive) <= 0:
        certificate['valid'] = False
        return certificate

    # Assigning attributes
    certificate['purpose'] = purpose
    certificate['registration_date'] = row['registration_date']
    certificate['student_data'] = {
        'email': row['student_email'],
        'full_name': row['student_full_name']
    }
    certificate['rejection_motive'] = rejection_motive

    return certificate


def generate_registration_number(def_nr=None):
    today = timezone.now().date()
    certificates_today = Certificate.objects.filter(processing_date=today)
    if certificates_today.exists():
        first_certificate_today = certificates_today.first()
        nr, _, rest = first_certificate_today.registration_number.partition(".")
        if def_nr is not None:
            nr = def_nr
        i = int(rest.split("/")[0][2:]) + 1
    else:
        if def_nr is not None:
            nr = def_nr
        else:
            nr = 177
        i = 1

    date_str = today.strftime("%d.%m.%Y")
    registration_number = f"{nr}.A.{i}/{date_str}"

    return registration_number


def get_google_sheets_data(processing_position=None):
    try:
        gc = authenticate_with_google()  # Authenticate with Google Sheets API
        worksheet = gc.open_by_url(os.environ['GOOGLE_FORMS_LINK']).sheet1  # Open spreadsheet by URL

        if processing_position is None:
            data = worksheet.get_all_records()
        else:
            data = worksheet.row_values(processing_position + 1)
            headers = worksheet.row_values(1)
            data = [dict(zip(headers, data))]

        # Modify the response data
        modified_data = []
        for idx, entry in enumerate(data):
            if (processing_position is not None) or (
            not Certificate.objects.filter(processing_position=idx + 1).first()):
                modified_entry = {
                    "registration_date": entry["Timestamp"],
                    "purpose": entry["Motiv solicitare adeverință"],
                    "processing_position": processing_position if processing_position is not None else (idx + 1)
                }

                today = timezone.now().date()
                certificates_today = Certificate.objects.filter(processing_date=today)
                if certificates_today.exists():
                    first_certificate_today = certificates_today.first()
                    nr, _, _ = first_certificate_today.registration_number.partition(".")
                    modified_entry["def_number"] = nr

                # Retrieve student information from StudentProfile object
                email = entry["Email Address"]
                student_profile = StudentProfile.objects.filter(email=email).first()

                if student_profile:
                    modified_entry["student_data"] = {
                        "email": email,
                        "full_name": student_profile.full_name
                    }

                modified_data.append(modified_entry)

        if processing_position is not None:
            modified_data = modified_data[0]
        return Response({"success": True, "data": modified_data})

    except Exception as e:
        return Response({"error": e})


# Create your views here.
class GetCertificatesList(APIView):
    def get(self, request, format=None):
        return get_google_sheets_data()


class GetApprovedCertificatesList(APIView):
    def get(self, request, format=None):
        try:
            certificates = Certificate.objects.filter(status="approved")
            serializer = CertificateSerializer(certificates, many=True)
            return Response({"success": True, "data": serializer.data})
        except Exception as e:
            return Response({"error": e})


class GetRejectedCertificatesList(APIView):
    def get(self, request, format=None):
        try:
            certificates = Certificate.objects.filter(status='rejected')
            serializer = CertificateSerializer(certificates, many=True)
            return Response({"success": True, "data": serializer.data})
        except Exception as e:
            return Response({"error": e})


class ApproveCertificateDetailView(APIView):
    def get(self, request, processing_position):
        return get_google_sheets_data(processing_position)

    def put(self, request, processing_position):
        try:
            certificateVal = validateCertificate(request.data)

            if certificateVal['valid']:
                student = StudentProfile.objects.filter(email=certificateVal['student_data']['email']).first()

                date_str = certificateVal["registration_date"].split()[0]
                date_object = datetime.strptime(date_str, "%m/%d/%Y")
                certificateVal["registration_date"] = date_object.strftime("%Y-%m-%d")

                if student:
                    Certificate.objects.create(
                        registration_number=generate_registration_number(def_nr=certificateVal['def_number']),
                        registration_date=certificateVal['registration_date'],
                        student=student,
                        purpose=certificateVal['purpose'],
                        status='approved',
                        processing_date=timezone.now().date(),
                        # processed_by=current_user,
                        processed_by=SecretaryProfile.objects.first(),
                        processing_position=processing_position
                    )
                else:
                    return Response({'error': 'Something went wrong: Student data not valid'},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'error': 'Something went wrong: Certificate data not valid'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': f'Successfully added certificate to DB'},
                            status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RejectCertificateDetailView(APIView):
    def get(self, request, processing_position):
        return get_google_sheets_data(processing_position)

    def put(self, request, processing_position):
        try:
            certificateVal = validateCertificate1(request.data)

            if certificateVal['valid']:
                student = StudentProfile.objects.filter(email=certificateVal['student_data']['email']).first()

                date_str = certificateVal["registration_date"].split()[0]
                date_object = datetime.strptime(date_str, "%m/%d/%Y")
                certificateVal["registration_date"] = date_object.strftime("%Y-%m-%d")

                if student:
                    Certificate.objects.create(
                        registration_date=certificateVal['registration_date'],
                        student=student,
                        purpose=certificateVal['purpose'],
                        status='rejected',
                        rejection_motive=certificateVal['rejection_motive'],
                        processing_date=timezone.now().date(),
                        # processed_by=current_user,
                        processed_by=SecretaryProfile.objects.first(),
                        processing_position=processing_position
                    )
                else:
                    return Response({'error': 'Something went wrong: Student data not valid'},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'error': 'Something went wrong: Certificate data not valid'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': f'Successfully added certificate to DB'},
                            status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EditCertificateDetailView(APIView):
    def get(self, request, certificate_id):
        try:
            certificate = Certificate.objects.get(id=certificate_id)
            serializer = CertificateSerializer(certificate)
            return Response({"success": True, "data": serializer.data})
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, certificate_id):
        try:
            certificateVal = validateCertificate(request.data)

            if certificateVal['valid']:
                certificate = Certificate.objects.get(id=certificate_id)
                serializer = CertificateSerializer(certificate, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'success': 'Certificate updated successfully'}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Something went wrong: Certificate data not valid'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
