from django.urls import path
from .views import GetCertificatesList, ApproveCertificateDetailView, RejectCertificateDetailView, \
    EditCertificateDetailView, GetRejectedCertificatesList, GetApprovedCertificatesList, GetCertificatesForPrint, \
    SetCertificatesPrinted, DownloadCertificates, DownloadAllCertificates
from . import views

urlpatterns = [
    path('getCertificatesList', GetCertificatesList.as_view()),
    path('getCertificatesForPrint', GetCertificatesForPrint.as_view()),
    path('getApprovedCertificatesList', GetApprovedCertificatesList.as_view()),
    path('getRejectedCertificatesList', GetRejectedCertificatesList.as_view()),
    path('approveCertificate/<int:processing_position>/', ApproveCertificateDetailView.as_view()),
    path('rejectCertificate/<int:processing_position>/', RejectCertificateDetailView.as_view()),
    path('editCertificate/<int:certificate_id>/', EditCertificateDetailView.as_view()),
    path('downloadCertificates', DownloadCertificates.as_view()),
    path('downloadAllCertificates', DownloadAllCertificates.as_view()),
    path('setCertificatesPrinted', SetCertificatesPrinted.as_view()),
]