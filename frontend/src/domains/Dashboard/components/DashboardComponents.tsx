import useFetchUser from "../hooks/useFetchUser";

const DashboardComponents = () => {
    const {email} = useFetchUser();
  return (
    <div>
            <h1>Dashboard</h1>
            {email && <p>Welcome, {email}!</p>}
            <div>Dashboard content</div>
        </div>
  )
}

export default DashboardComponents