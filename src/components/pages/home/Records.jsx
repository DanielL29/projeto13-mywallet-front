import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Record from './Record'

export default function Records({ records, loading, setRecords, setBalance, setLoading, balanceStatus, balanceFormatted }) {
    if (records.length > 0) {
        return (
            <>
                <div className="records">
                    {records.map(record =>
                        <Record key={record._id}
                            id={record._id}
                            date={loading ? <Skeleton width={70} height={20} /> : record.date}
                            description={loading ? <Skeleton width="99%" height={20} /> : record.description}
                            price={loading ? <Skeleton width={70} height={20} /> : record.price}
                            isIncrease={record.isIncrease}
                            setRecords={setRecords}
                            setBalance={setBalance}
                            setLoading={setLoading}
                            record={record}
                        />
                    )}
                </div>
                <div className="balance">
                    <h1>SALDO</h1>
                    <h2 className={balanceStatus}>{loading ? <Skeleton width={70} height={30} /> : balanceFormatted}</h2>
                </div>
            </>
        )
    } else if(!loading && records.length === 0) {
        return <div className="no-records">Não há registros de entrada ou saída</div>
    } 
}