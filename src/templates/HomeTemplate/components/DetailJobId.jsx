
import { useParams } from 'react-router-dom'


const DetailJobId = () => {
    const param = useParams();
    console.log(param);
  return (
    <div >Hello</div>
  )
}

export default DetailJobId
