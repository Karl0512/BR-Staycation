import { Link } from "react-router-dom";
import "../style/dashboard.css";
import SideNav from './SideNav'; // Import SideNav component
import SimpleCalendar from "./Calendar";
import { styled } from "styled-components";

export default function Dashboard() {
    const StyledCalendar = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 350px;
        padding: 20px;

        .calendar {
            width: 100%;
            heigth: 100vh:
            padding: 20px;
            font-size: 1em;
            box-shadow: none;
            border: none;
            font-family: 'Poppins', 'Sans-serif';
            
        }
        
        .calendar table, th, td {
            border: 3px solid #c6b5a1;
            border-collapse: collapse;
        }

        table {
            margin-top: 20px;
        }

        .calendar th {
            background-color: #c6b5a1;
        }
    `;

    return (
        <>
        <SideNav />
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1>Overview</h1>
            </div>
            
        </div>
        <div className="dashboard-table">
            <table className="dashboard-overview-table">
                <tr>
                    <th>Customer Name</th>
                    <th>Room number</th>
                    <th>Check-in date</th>
                    <th>Check-out date</th>
                    <th>Booking status</th>
                    <th>payment status</th>
                </tr>
                <tr>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                </tr>
                <tr>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                </tr>
                <tr>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                    <td>empty</td>
                </tr>   
            </table>
        </div>
        <div style={{ 
            marginLeft: "350px", 
            padding: "20px 20px 0 20px", 
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "poppins",
            }}>
            <div style={{ height: "50px", width: "50px", backgroundColor: "red" }}></div>
            <h1>Booked</h1>
        </div>
        <StyledCalendar>
            <SimpleCalendar />
        </StyledCalendar>
        </>
    )
}
