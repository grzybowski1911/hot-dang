import Link from "next/link"

export const ButtonLink = ({destination, label}) => {
    return (
        <div className="btn">
            <Link href={destination}>
                {label}
            </Link>
        </div>
    );
}