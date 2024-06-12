from django.urls import path
from .views import GetCertificatesList, ApproveCertificateDetailView, RejectCertificateDetailView, \
    EditCertificateDetailView, GetRejectedCertificatesList, GetApprovedCertificatesList
from . import views

urlpatterns = [
    path('getCertificatesList', GetCertificatesList.as_view()),
    path('getApprovedCertificatesList', GetApprovedCertificatesList.as_view()),
    path('getRejectedCertificatesList', GetRejectedCertificatesList.as_view()),
    path('approveCertificate/<int:processing_position>/', ApproveCertificateDetailView.as_view()),
    path('rejectCertificate/<int:processing_position>/', RejectCertificateDetailView.as_view()),
    path('editCertificate/<int:certificate_id>/', EditCertificateDetailView.as_view()),
    path('certificates/download', views.download_certificates, name='download_certificates'),
]