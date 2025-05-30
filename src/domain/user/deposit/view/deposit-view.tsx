import Deposit from '../components/deposit'

const DepositView = () => {
  return (
   <>
    <div className='px-5'>
        <h1 className="relative border-b max-w-2xl border-gray-300 py-3 text-xl font-medium md:mt-10 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-1 before:w-9 before:bg-blue-900">
          Deposit
        </h1>
      </div>
    <div className="md:mt-12 px-5">
      <Deposit />
      </div>
   </>
  )
}

export default DepositView
