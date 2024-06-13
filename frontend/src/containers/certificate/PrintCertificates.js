import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchCertificatesForPrint, setCertificatesAsPrinted} from '../../actions/certificates';
import {TailSpin} from "react-loader-spinner";
import SingleCertificate from "./SingleCertificate";
import axios from "axios";

const PrintCertificates = ({fetchCertificatesForPrint, setCertificatesAsPrinted, certificatesForPrint, error}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [secretaryName, setSecretaryName] = useState('');

     useEffect(() => {
        const fetchEmail = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/get-profile-name/`);
                setSecretaryName(res.data.name);
            } catch (err) {
                console.error('Error fetching email:', err);
            }
        };

        fetchEmail();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchCertificatesForPrint().then(() => {
            setIsLoading(false); 
        });
    }, [fetchCertificatesForPrint]);
    const handlePrint = () => {
        window.print();
        setCertificatesAsPrinted(certificatesForPrint.map((el) => (el.id)));
    };

    // Gruparea adeverințelor câte 4 pe pagină
    const groupedCertificates = [];
    for (let i = 0; i < certificatesForPrint.length; i += 4) {
        groupedCertificates.push(certificatesForPrint.slice(i, i + 4));
    }

    return (
        <div className="print-container">
            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <div className="justify-content-center d-flex mt-5">
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                              wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>
            ) : certificatesForPrint && certificatesForPrint.length > 0 ?
                (
                    <>
                        <button className="mt-3 mb-4 btn btn-info mx-auto d-block print-hide" onClick={handlePrint}>Printează Adeverințe</button>
                        <div className={`print-certificates-container`}>
                            {groupedCertificates.map((group, pageIndex) => (
                                <div key={pageIndex} className="page-break">
                                    {group.map((certificate) => (
                                        <SingleCertificate key={certificate.id} certificate={certificate} secretary={secretaryName}/>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                ) :
                (<p>Niciun rezultat</p>)
            }
        </div>
    );
}
const mapStateToProps = (state) => ({
    certificatesForPrint: state.certificate.certificatesForPrint,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchCertificatesForPrint, setCertificatesAsPrinted})(PrintCertificates);
