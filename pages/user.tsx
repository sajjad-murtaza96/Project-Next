const user = (props: any) => {
    return <h1>{props.username}</h1>
}

export default user;

export async function getServerSideProps() {
    return {
        props: {
            username: "sajjad"
        }
    }
}