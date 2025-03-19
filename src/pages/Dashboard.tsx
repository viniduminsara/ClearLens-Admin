import { DashboardCard, CardBody, CardTitle } from "../components/DashboardCard.tsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    const salesData = [
        { month: "Jan", sales: 4000 },
        { month: "Feb", sales: 3000 },
        { month: "Mar", sales: 5000 },
        { month: "Apr", sales: 7000 },
        { month: "May", sales: 6000 },
        { month: "Jun", sales: 8000 },
    ];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Total Sales</CardTitle>
                        <p className="text-3xl font-bold">$25,432</p>
                    </CardBody>
                </DashboardCard>
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Orders</CardTitle>
                        <p className="text-3xl font-bold">1,234</p>
                    </CardBody>
                </DashboardCard>
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Customers</CardTitle>
                        <p className="text-3xl font-bold">5,678</p>
                    </CardBody>
                </DashboardCard>
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Revenue</CardTitle>
                        <p className="text-3xl font-bold">$78,900</p>
                    </CardBody>
                </DashboardCard>
            </div>

            {/* Sales Chart */}
            <div className="bg-base-100 shadow-lg p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#4CAF50" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Orders */}
            <div className="bg-base-100 shadow-lg p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>#12345</td>
                            <td>John Doe</td>
                            <td className="text-green-500">Completed</td>
                            <td>$120.00</td>
                        </tr>
                        <tr>
                            <td>#12346</td>
                            <td>Jane Smith</td>
                            <td className="text-yellow-500">Pending</td>
                            <td>$90.00</td>
                        </tr>
                        <tr>
                            <td>#12347</td>
                            <td>Mike Johnson</td>
                            <td className="text-red-500">Cancelled</td>
                            <td>$45.00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
