import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
};

const DashboardCard = ({ children }: CardProps) => {
    return (
        <div className="bg-base-100 shadow-lg rounded-xl p-4">
            {children}
        </div>
    );
};

const CardBody = ({ children }: CardProps) => {
    return (
        <div className="p-4">
            {children}
        </div>
    );
};

const CardTitle = ({ children }: CardProps) => {
    return (
        <h2 className="text-lg font-semibold mb-2">{children}</h2>
    );
};

export { DashboardCard, CardBody, CardTitle };
