export default function Wrapper() {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ padding: "16px" }}>
                    <li className="breadcrumb-item"><a href="/#">Warranty Component Administration </a></li>
                    <li className="breadcrumb-item active" aria-current="page">Plan</li>
                </ol>
            </nav>
            <div className="container welcome-container">
                <div className="welcome">Welcome Chethan</div>
                <h4 className="search">Search Plan</h4>
            </div>
        </div>
    );
}