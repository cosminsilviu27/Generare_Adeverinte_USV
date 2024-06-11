from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.urls import reverse

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def get_login_redirect_url(self, request):
        """
        Returns the URL to redirect to after a successful login.
        """
        # You can add any logic here, for example, checking user type
        return reverse('secretary-page')  # Assuming 'secretary-page' is the name of your URL pattern
