import React from 'react';

function SingleCertificate({certificate, secretary}) {
    return (
        <div className="print-certificate-container">
            <div className="print-certificate-header">
                UNIVERSITATEA "ȘTEFAN CEL MARE" DIN SUCEAVA <br/>
                {certificate.student.faculty.full_name.toUpperCase()}<br/>
                <div className="print-nr">
                    Nr. {certificate.registration_number.split('/')[0]}/{certificate.student.faculty.short_name}/{certificate.registration_number.split('/')[1]}
                </div>
            </div>

            <div className="print-certificate-content">
                <span className="print-certificate-title">A D E V E R I N Ț Ă</span>
                &emsp;&emsp;{certificate.student.sex == 'F' ? 'Studenta' : 'Studentul'} {certificate.student.full_name} este
                înscris{certificate.student.sex == 'F' ? 'ă' : ''} în anul
                universitar {certificate.student.faculty.current_academic_year}, în
                anul {certificate.student.study_year} de
                studii, {certificate.student.study_cycle.toLowerCase() == 'licență' ? 'program' : 'domeniu'} de studii
                - {certificate.student.study_cycle.toLowerCase()}: {certificate.student.study_program_name}, forma
                de învățământ {certificate.student.study_form == 'IF' ? 'cu frecvență' : 'fără frecvență'},
                regim: {certificate.student.funding.toLowerCase() == 'buget' ? 'fără taxă' : 'cu taxă'}.<br/>

                &emsp;&emsp;Adeverința se eliberează pentru a-i servi la {certificate.purpose}.
            </div>

            <div className="print-certificate-footer">
                <div className="row w-100">
                    <div className="col col-4 text-center">
                        <span className="font-weight-bold">D E C A N</span>,
                    </div>
                    <div className="col col-4 text-center">
                        <span className="font-weight-bold">SECRETAR ȘEF</span>,
                    </div>
                    <div className="col col-4 text-center">
                        <span className="font-weight-bold">SECRETARIAT</span>,
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col col-4 text-center">
                        {certificate.student.faculty.dean_name}
                    </div>
                    <div className="col col-4 text-center bold">
                        {certificate.student.faculty.chief_secretary.first_name} {certificate.student.faculty.chief_secretary.last_name}
                    </div>
                    <div className="col col-4 text-center">
                        {secretary}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCertificate;
