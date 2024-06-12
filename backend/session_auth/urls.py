from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
# from social.views import oauth_callback

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('profile/', include('admin_profile.urls')),
    path('accounts/', include('allauth.urls')),
    path('students/', include('student_profile.urls')),
    path('secretaries/', include('secretary_profile.urls')),
    path('faculties/', include('faculty.urls')),
    path('certificates/', include('certificate.urls')),
    path('social/', include('social.urls')),
    path('profiles/', include('profiles.urls')),
]

# Catch all for React routes
urlpatterns += [re_path(r'^(?!.*login).*$', TemplateView.as_view(template_name='index.html'))]
