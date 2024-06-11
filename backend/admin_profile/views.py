from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AdminProfile
from .serializers import AdminProfileSerializer
import logging

logger = logging.getLogger(__name__)

class GetAdminProfileView(APIView):
    def get(self, request):
        try:
            user = self.request.user
            username = user.username

            user_profile = AdminProfile.objects.get(user=user)
            user_profile = AdminProfileSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username)})
        except AdminProfile.DoesNotExist:
            logger.error(f"AdminProfile for user {user.username} does not exist.")
            return Response({'error': 'Something went wrong when retrieving profile'})
        except Exception as e:
            logger.error(f"Error retrieving profile: {str(e)}")
            return Response({'error': 'Something went wrong when retrieving profile'})


class UpdateAdminProfileView(APIView):
    def put(self, request):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            city = data['city']

            logger.debug(f"Updating profile for user {username} with data: {data}")

            # Ensure the profile exists or create it if it doesn't
            user_profile, created = AdminProfile.objects.get_or_create(user=user)
            user_profile.first_name = first_name
            user_profile.last_name = last_name
            user_profile.phone = phone
            user_profile.city = city
            user_profile.save()

            user_profile_serialized = AdminProfileSerializer(user_profile)

            logger.debug(f"Updated profile: {user_profile_serialized.data}")

            return Response({'profile': user_profile_serialized.data, 'username': str(username)})
        except Exception as e:
            logger.error(f"Error updating profile: {str(e)}")
            return Response({'error': 'Something went wrong when updating profile'})
