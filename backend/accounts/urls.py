from django.urls import path
from .views import SignupView, GetCSRFToken, LoginAdminView, LogoutAdminView, CheckAuthenticatedView, DeleteAccountView,  \
    LogoutSecretaryView

urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('register', SignupView.as_view()),
    path('login', LoginAdminView.as_view()),
    path('logout', LogoutAdminView.as_view()),
    # path('logout/', LogoutSecretaryView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view())
]
