import Link from "next/link";

const EmptyCart: React.FC<{}> = () => {
    return (
        <div className="text-center">
            <p className="mt-6 text-base leading-7 text-gray-600">Your Shopping Cart is empty</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    href="/"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Back to home
                </Link>
            </div>
        </div>
    )
}

export default EmptyCart;