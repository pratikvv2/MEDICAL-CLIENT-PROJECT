

// eslint-disable-next-line no-unused-vars, react/prop-types
const Contact = ({ isLargeScreen }) => {
    return (
        <div className="bg-primary">
            {isLargeScreen ? (
                <h5 className={`d-flex py-2 text-light  justify-content-center  gap-4`}>
                    <i className="bi text-light bi-telephone-forward-fill"></i>
                    <span>840-356-4255</span>
                    <span>840-356-4256</span>
                </h5>
            ) : (
                <h5 className={`d-flex py-2 text-light  align-items-center justify-content-center  gap-4`}>
                    <i className="bi text-light bi-telephone-forward-fill"></i>
                    <div className="numbers">
                        <span>840-356-4255</span>
                        <br />
                        <span>840-356-4256</span>
                    </div>
                </h5>
            )}


        </div>
    )
}

export default Contact