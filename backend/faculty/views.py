from rest_framework.views import APIView
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework import status
import pandas as pd

from secretary_profile.models import SecretaryProfile
from .models import Faculty
from .serializers import FacultySerializer


class UpdateFacultiesList(APIView):
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

            # Delete existing faculty records
            Faculty.objects.all().delete()

            # Insert new faculties from the uploaded file
            for index, row in df.iterrows():
                secretary = SecretaryProfile.objects.filter(first_name=row['chief_secretary_first_name']).filter(last_name=row['chief_secretary_last_name']).first()
                if secretary is None:
                    secretary = SecretaryProfile.objects.first()

                Faculty.objects.create(
                    full_name=row['full_name'],
                    short_name=row['short_name'],
                    current_academic_year=row['current_academic_year'],
                    dean_name=row['dean_name'],
                    chief_secretary=secretary
                )

            return Response({'success': f'Successfully added faculties to DB'},
                            status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FacultyListAPIView(APIView):

    def get(self, request, format=None):
        try:
            faculties = Faculty.objects.all()
            serializer = FacultySerializer(faculties, many=True)
            return Response({"success": True, "data": serializer.data})
        except Exception as e:
            return Response({"error": e})
