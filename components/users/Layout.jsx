export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4" id="layout">
            <div className="container">
                {children}
            </div>
        </div>
    );
}