from rest_framework.views import APIView
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from .models import SecretaryProfile
from .serializers import SecretarySerializer


class UpdateSecretariesList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            uploaded_file = request.FILES['file']

            # Check file extension (xlsx or csv)
            if uploaded_file.name.endswith('.xlsx'):
                df = pd.read_excel(uploaded_file)
            elif uploaded_file.name.endswith('.csv'):
                df = pd.read_csv(uploaded_file)
            else:
                return Response({'fileError': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)

            # Delete existing secretary records
            SecretaryProfile.objects.all().delete()

            # Insert new secretaries from the uploaded file
            for index, row in df.iterrows():
                SecretaryProfile.objects.create(
                    first_name=row['first_name'],
                    last_name=row['last_name'],
                    email=row['email'],
                    title=row['title']
                )

            return Response({'success': 'Secretaries added successfully to DB'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SecretaryListAPIView(APIView):

    def get(self, request, format=None):
        try:
            secretaries = SecretaryProfile.objects.all()
            serializer = SecretarySerializer(secretaries, many=True)
            return Response({"success": True, "data": serializer.data})
        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SecretaryDetailView(APIView):
    def get(self, request, secretary_id):
        try:
            secretary = SecretaryProfile.objects.get(id=secretary_id)
            serializer = SecretarySerializer(secretary)
            return Response({"success": True, "data": serializer.data})
        except SecretaryProfile.DoesNotExist:
            return Response({'error': 'Secretary not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, secretary_id):
        try:
            secretary = SecretaryProfile.objects.get(id=secretary_id)
            serializer = SecretarySerializer(secretary, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'Secretary updated successfully'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except SecretaryProfile.DoesNotExist:
            return Response({'error': 'Secretary not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

