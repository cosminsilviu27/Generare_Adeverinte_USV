import os

from rest_framework.response import Response
import gspread
from google.oauth2.service_account import Credentials
from django.conf import settings
from rest_framework.views import APIView

from student_profile.models import StudentProfile


def authenticate_with_google():
    credentials = Credentials.from_service_account_info(settings.GOOGLE_SERVICE_ACCOUNT_JSON)
    scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/spreadsheets.readonly'])
    gc = gspread.authorize(scoped_credentials)
    return gc


# Create your views here.
class get_google_sheets_data(APIView):
    def get(self, request, format=None):
        try:
            gc = authenticate_with_google()  # Authenticate with Google Sheets API
            worksheet = gc.open_by_url(os.environ['GOOGLE_FORMS_LINK']).sheet1  # Open spreadsheet by URL

            data = worksheet.get_all_records()

            # Modify the response data
            modified_data = []
            for entry in data:
                modified_entry = {
                    "registration_date": entry["Timestamp"],
                    "purpose": entry["Motiv solicitare adeverință"]
                }

                # Retrieve student information from StudentProfile object
                email = entry["Email Address"]
                student_profile = StudentProfile.objects.filter(email=email).first()
                if student_profile:
                    modified_entry["student_data"] = {
                        "email": email,
                        "full_name": student_profile.full_name
                    }

                modified_data.append(modified_entry)

            return Response({"success": True, "data": modified_data})

        except Exception as e:
            return Response({"error": e})
