from rest_framework.views import APIView
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework import status
import pandas as pd

from faculty.models import Faculty
from .models import StudentProfile
from .serializers import StudentSerializer
from unicodedata import normalize
import re


def validateStudent(row):
    student = {'valid': True}  # Using a dictionary to store the validation status and data

    # Remove white spaces
    fullname = row['full_name'].strip()

    # Check full name length
    if len(fullname) <= 0 or len(fullname) > 255:
        student['valid'] = False
        return student

    # Email address validation
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, row['email']):
        student['valid'] = False
        return student

    # Email address domain validation
    domain = '@student.usv.ro'
    if not row['email'].endswith(domain):
        student['valid'] = False
        return student

    # Diacritics removal for email check
    fullname = normalize('NFKD', fullname).encode('ascii', errors='ignore').decode('utf-8')

    # Split full name into first and last names
    names = fullname.split()
    if len(names) < 2:  # Ensure we have at least a first name and a last name
        student['valid'] = False
        return student

    first_name = names[0]
    last_name = names[-1]

    # Construct the expected email format based on last name and first name
    expected_email_prefix = f"{last_name.lower()}.{first_name.lower()}"

    # Compare the expected email prefix with the actual email prefix
    if not row['email'].split('@')[0] == expected_email_prefix:
        student['valid'] = False
        return student

    # Funding status validation (const string check)
    allowed_statuses = ['buget', 'taxă']
    if row['funding'].lower() not in allowed_statuses:
        student['valid'] = False
        return student

    # Sex validation (const string check)
    allowed_statuses = ['M', 'F']
    if row['sex'].upper() not in allowed_statuses:
        student['valid'] = False
        return student

    # Assigning attributes
    student['full_name'] = fullname
    student['email'] = row['email']
    student['funding'] = row['funding'].capitalize()
    student['sex'] = row['sex'].upper()
    student['study_program_name'] = row['study_program_name']
    student['study_cycle'] = row['study_cycle']
    student['study_year'] = row['study_year']
    student['study_domain'] = row['study_domain']
    student['study_form'] = row.get('study_form', 'IF')
    student['faculty'] = row.get('faculty')

    return student


class UpdateStudentsList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            uploaded_file = request.FILES.get('file')

            if not uploaded_file:
                return Response({'fileError': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

            # Check file extension (xlsx or csv)
            if uploaded_file.name.endswith('.xlsx'):
                df = pd.read_excel(uploaded_file)
            elif uploaded_file.name.endswith('.csv'):
                df = pd.read_csv(uploaded_file)
            else:
                return Response({'fileError': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)

            # Delete existing student records
            StudentProfile.objects.all().delete()

            success_count = 0
            error_count = 0

            # Insert new students from the uploaded file
            for index, row in df.iterrows():
                student = validateStudent(row)

                if student['valid']:
                    try:
                        faculty = Faculty.objects.filter(short_name=student['faculty']).first()

                        StudentProfile.objects.create(
                            email=student['email'],
                            study_program_name=student['study_program_name'],
                            study_cycle=student['study_cycle'],
                            study_year=student['study_year'],
                            study_domain=student['study_domain'],
                            study_form=student['study_form'],
                            funding=student['funding'],
                            full_name=student['full_name'],
                            sex=student['sex'],
                            faculty=faculty
                        )
                        success_count += 1
                    except Exception as e:
                        error_count += 1
                else:
                    error_count += 1

            if error_count > 0:
                return Response({'error': f'{error_count} students were not successfully added to DB'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': f'Successfully added {success_count} students to DB'},
                            status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateStudent(APIView):
    permission_classes = (permissions.AllowAny,)

    def put(self, request):
        try:
            student = validateStudent(request.data)

            if student['valid']:
                faculty = Faculty.objects.filter(short_name=student['faculty']).first()

                StudentProfile.objects.create(
                    email=student['email'],
                    study_program_name=student['study_program_name'],
                    study_cycle=student['study_cycle'],
                    study_year=student['study_year'],
                    study_domain=student['study_domain'],
                    study_form=student['study_form'],
                    funding=student['funding'],
                    full_name=student['full_name'],
                    sex=student['sex'],
                    faculty=faculty
                )
            else:
                return Response({'error': 'Something went wrong: Student data not valid'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': f'Successfully added student to DB'},
                            status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StudentListAPIView(APIView):

    def get(self, request, format=None):
        try:
            students = StudentProfile.objects.all()
            serializer = StudentSerializer(students, many=True)
            return Response({"success": True, "data": serializer.data})
        except Exception as e:
            return Response({"error": e})

class StudentDetailView(APIView):
    def get(self, request, student_id):
        try:
            student = StudentProfile.objects.get(id=student_id)
            serializer = StudentSerializer(student)
            return Response({"success": True, "data": serializer.data})
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, student_id):
        try:
            studentVal = validateStudent(request.data)

            if studentVal['valid']:
                student = StudentProfile.objects.get(id=student_id)
                serializer = StudentSerializer(student, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'success': 'Student updated successfully'}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Something went wrong: Student data not valid'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except StudentProfile.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

