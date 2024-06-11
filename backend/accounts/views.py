from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from rest_framework.response import Response
from admin_profile.models import AdminProfile
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
import logging
from allauth.account.views import logout as allauth_logout
from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser


class CheckAuthenticatedView(APIView):
    def get(self, request):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)

                        user = User.objects.get(id=user.id)

                        AdminProfile.objects.create(user=user, first_name='', last_name='', phone='',
                                                    city='')

                        return Response({'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return Response({'error': 'Something went wrong when registering account'})


@method_decorator(csrf_protect, name='dispatch')
class LoginAdminView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated'})
            else:
                return Response({'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutAdminView(APIView):
    def post(self, request):
        try:
            auth.logout(request)
            return Response({'success': 'Logged Out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})

class LogoutSecretaryView(APIView):
    def post(self, request):
        logging.info('Custom logout view accessed')
        # Perform any additional cleanup or logging here if needed

        if isinstance(request.user, AnonymousUser):
            # If the user is anonymous, they are already logged out
            return JsonResponse({'success': True, 'message': 'User is already logged out'})

        # Call Django allauth's logout view
        response = allauth_logout(request)

        # Check if the session has been cleared
        if request.session.is_empty():
            return JsonResponse({'success': True, 'message': 'Logout successful'})
        else:
            return JsonResponse({'success': False, 'error': 'Logout failed'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response({'success': 'CSRF cookie set'})

class DeleteAccountView(APIView):
    def delete(self, request):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong when trying to delete user'})
