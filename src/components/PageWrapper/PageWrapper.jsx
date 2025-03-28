
import './PageWrapper.scss';

// eslint-disable-next-line react/prop-types
const PageWrapper = ({ children, isTop, ...className }) => {

    return (
        <div
            className={`page-wrapper ${isTop ? "space-top" : ""} ${className}`}
        >
            {children}
        </div>
    )
}

export default PageWrapper