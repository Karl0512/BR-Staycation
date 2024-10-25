import SideNav from "./SideNav";
import { Link } from 'react-router-dom';
import "../style/customer.css"

export default function Customer() {
    return (
        <>
            <SideNav />
            <div className="dashboard-container">
                <h1>Overview</h1>
                <li><Link>+ Add Booking</Link></li>

            </div>
            <div className="dashboard-table">
                <table className="dashboard-overview-table">
                    <tr>
                        <th>Customer Name</th>
                        <th>Contact number</th>
                        <th>Booking History</th>
                        <th>Notes</th>
                        <th>payment status</th>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                        <td>empty</td>
                        <td>empty</td>
                        <td>empty</td>
                        <td>empty</td>
                        <td>empty</td>
                    </tr>
                </table>
            </div>


        </>
    )
}