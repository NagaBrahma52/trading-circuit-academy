"use client";

import { useState } from "react";
import Header from "./header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {


    const [collapsed, setCollapsed] = useState(false);


    return (

        <>

            <Header
                collapsed={collapsed}
                toggle={() => setCollapsed(!collapsed)}
            />


            <Sidebar
                collapsed={collapsed}
            />


            <main

                style={{
                    marginLeft: collapsed ? "80px" : "260px",
                    marginTop: "64px",
                    marginBottom: "45px",
                    padding: "25px",
                    minHeight: "calc(100vh - 109px)",
                    background: "#f8fafc",
                    transition: "0.3s"
                }}

            >

                {children}

            </main>


            <Footer />


        </>

    )

}