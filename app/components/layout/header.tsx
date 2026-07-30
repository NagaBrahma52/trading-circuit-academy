"use client";

interface Props {
  collapsed: boolean;
  toggle: () => void;
}
import Image from "next/image";

export default function Header({
  collapsed,
  toggle
}: Props) {

  return (

    <header
      className="navbar navbar-expand bg-white border-bottom fixed-top shadow-sm"
      style={{ height: "64px" }}
    >

      <div className="container-fluid">


        <button
          className="btn btn-light border"
          onClick={toggle}
        >
          <i className="bi bi-list fs-4"></i>
        </button>


        <span className="navbar-brand fw-bold text-primary ms-3">
        <Image
          src="/logo.jpeg"
          alt="Trading Circuit"
          width={40}
          height={40}
          className="me-2 rounded-circle"
        />
          Trading Circuit Academy
        </span>


        <div className="ms-auto d-flex gap-3">


          <button className="btn btn-light rounded-circle">
            <i className="bi bi-bell"></i>
          </button>


          <button className="btn btn-light rounded-circle">
            <i className="bi bi-person"></i>
          </button>


        </div>


      </div>

    </header>

  )

}