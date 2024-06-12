import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchRejectedCertificatesList} from '../../actions/certificates';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";
import {DateRangePicker} from "react-dates";

const RejectedCertificatesList = ({fetchRejectedCertificatesList, rejectedCertificates, error}) => {


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchRejectedCertificatesList().then(() => {
            setIsLoading(false);
        });
    }, [fetchRejectedCertificatesList]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rejectedCertificates.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rejectedCertificates.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilter = () => {
        fetchRejectedCertificatesList(startDate, endDate);
    };

    return (
        <div className="container">
            <div className="text-center mb-4">
                <DateRangePicker
                    startDate={startDate}
                    startDateId="rejected_cert_start_date_id"
                    endDate={endDate}
                    endDateId="rejected_cert_end_date_id"
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

            <h1 className="mt-3">Lista de adeverințe refuzate:</h1>

            {error && <p>{error}</p>}

            {isLoading ? (
                <div className="justify-content-center d-flex mt-5">
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                              wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>
            ) : rejectedCertificates && rejectedCertificates.length > 0 ?
                (<>
                    <div className="mt-3">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Nume și prenume student</th>
                                <th>Email student</th>
                                <th>Motiv solicitare</th>
                                <th>Data procesării</th>
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
    rejectedCertificates: state.certificate.rejectedCertificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchRejectedCertificatesList})(RejectedCertificatesList);
