import styles from './LoadingIcon.module.css'

function LoadingIcon() {
    return (
        <div className={`${styles.position} d-flex justify-content-center`}>
            <div className="spinner-border" role="status">
                <span className="sr-only"/>
            </div>
        </div>
    )
}

export default LoadingIcon;