
import VertiSearch from "../components/VertiSearch"
import JobCard from "../components/JobCard"


const JobsLayout = () => {
  return (
    <>
        <header>
            <VertiSearch/>
        </header>
        <main>
            <JobCard/>
        </main>
    </>
  )
}

export default JobsLayout