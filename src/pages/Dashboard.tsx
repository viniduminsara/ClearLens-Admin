import { DashboardCard, CardBody, CardTitle } from "../components/DashboardCard.tsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {getDashboardDataService} from "../services/apiServices.ts";
import {ChartDataItem, DashboardData} from "../interfaces/api.ts";
import {useToast} from "../context/ToastContext.tsx";
import {useEffect, useState} from "react";

const Dashboard = () => {
    const { showToast } = useToast();
    const [salesCount, setSalesCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);

    const fetchDashboardData = async () => {
        const res = await getDashboardDataService();
        if (res.success) {
            const { salesCount, ordersCount, customersCount, chartData } = res.body as DashboardData;
            setSalesCount(salesCount);
            setOrderCount(ordersCount);
            setCustomerCount(customersCount);
            setChartData(chartData);
            console.log(customerCount);
        } else {
            showToast({ type: "error", message: res.message as string });
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Total Sales</CardTitle>
                        <p className="text-3xl font-bold">Rs.{salesCount.toLocaleString()}</p>
                    </CardBody>
                </DashboardCard>
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Completed Orders</CardTitle>
                        <p className="text-3xl font-bold">{orderCount}</p>
                    </CardBody>
                </DashboardCard>
                <DashboardCard>
                    <CardBody>
                        <CardTitle>Customers</CardTitle>
                        <p className="text-3xl font-bold">{customerCount}</p>
                    </CardBody>
                </DashboardCard>
            </div>

            {/* Sales Chart */}
            <div className="bg-base-100 shadow-lg p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#7480FF" minPointSize={5}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
