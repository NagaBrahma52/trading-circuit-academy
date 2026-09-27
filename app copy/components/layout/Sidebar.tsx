"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar({
    collapsed
}: {
    collapsed: boolean
}) {


    const pathname = usePathname();


    const menus = [
        {
            name: "Dashboard",
            icon: "bi-grid",
            url: "/dashboard"
        },
        {
            name: "Position Sizing",
            icon: "bi-calculator",
            url: "/dashboard/position-sizing"
        },
        {
            name: "Risk Reward",
            icon: "bi-bar-chart",
            url: "#"
        },
        {
            name: "Trading Journal",
            icon: "bi-journal-text",
            url: "#"
        },
        {
            name: "Courses",
            icon: "bi-play-circle",
            url: "#"
        },
        {
            name: "Settings",
            icon: "bi-gear",
            url: "#"
        }

    ];


    return (

        <aside

            className="position-fixed bg-white border-end"

            style={{
                top: "64px",
                bottom: "45px",
                width: collapsed ? "80px" : "260px",
                transition: "0.3s",
                overflow: "hidden"
            }}

        >


            <div className="p-3">


                <p className="text-uppercase text-muted small">
                    {!collapsed && "Menu"}
                </p>


                <ul className="nav flex-column">


                    {
                        menus.map(item => (

                            <li
                                className="mb-2"
                                key={item.name}
                            >


                                <Link

                                    href={item.url}

                                    className={`
nav-link d-flex align-items-center rounded-3 py-2
${pathname === item.url
                                            ? "active-menu"
                                            : "text-secondary"
                                        }
`}

                                >


                                    <i
                                        className={`bi ${item.icon} fs-5`}
                                    ></i>


                                    {
                                        !collapsed &&
                                        <span className="ms-3">
                                            {item.name}
                                        </span>
                                    }


                                </Link>


                            </li>


                        ))
                    }


                </ul>


            </div>


        </aside>

    )

}