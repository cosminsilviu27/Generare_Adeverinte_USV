import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchApprovedCertificatesList, downloadCertificates} from '../../actions/certificates';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const ApprovedCertificatesList = ({
                                      fetchApprovedCertificatesList,
                                      downloadCertificates,
                                      approvedCertificates,
                                      error
                                  }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchApprovedCertificatesList().then(() => {
            setIsLoading(false);
        });
    }, [fetchApprovedCertificatesList]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = approvedCertificates.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(approvedCertificates.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilter = () => {
        fetchApprovedCertificatesList(startDate, endDate);
    };

    const handleDownload = () => {
        downloadCertificates();
    };

    return (
        <div className="container">
            <div className="text-center mb-4">
                <DateRangePicker
                    startDate={startDate}
                    startDateId="approved_cert_start_date_id"
                    endDate={endDate}
                    endDateId="approved_cert_end_date_id"
                    onDatesChange={({startDate, endDate}) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                    minimumNights={0}
                />
                <button className="btn btn-info ml-3" onClick={handleFilter}>Filtrează</button>
            </div>
            <div className='mt-3'>
                <Fragment>
                    <Link to={'/print-certificates'} className='btn btn-primary'>Printează adeverințe aprobate</Link>
                </Fragment>
                <Fragment>
                    <button className="btn btn-primary ml-3" onClick={handleDownload}>Descarcă raport adeverințe
                        aprobate astăzi
                    </button>
                </Fragment>
            </div>

            <h1 className="mt-3">Lista de adeverințe aprobate:</h1>

            {error && <p>{error}</p>}

            {isLoading ? (
                <div className="justify-content-center d-flex mt-5">
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                              wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>
            ) : approvedCertificates && approvedCertificates.length > 0 ?
                (<>
                    <div className="mt-3">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Nume și prenume student</th>
                                <th>Email student</th>
                                <th>Motiv solicitare</th>
                                <th>Data procesării</th>
                                <th>Printată</th>
                                <th>Acțiuni</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((certificate, index) => (
                                <tr key={index}>
                                    <td>{certificate.student?.full_name ?? "-"}</td>
                                    <td>{certificate.student?.email ?? "-"}</td>
                                    <td>{certificate.purpose}</td>
                                    <td>{certificate.processing_date}</td>
                                    <td>{certificate.was_printed ? 'Da' : 'Nu'}</td>
                                    <td>
                                        <Link to={`/edit-certificate/${certificate.id}`}
                                              className="btn btn-primary mr-2">Modifică</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="text-right">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}
                                    className="btn btn-info mr-3">Previous
                            </button>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}
                                    className="btn btn-info">Next
                            </button>
                        </div>
                    </div>
                </>) :
                (<p>Niciun rezultat</p>)
            }
        </div>
    );
}
const mapStateToProps = (state) => ({
    approvedCertificates: state.certificate.approvedCertificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {
    fetchApprovedCertificatesList,
    downloadCertificates
})(ApprovedCertificatesList);