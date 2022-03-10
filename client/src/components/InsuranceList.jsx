import React from "react"
import InsuranceAccessButton from './InsuranceAccessButton'

const InsuranceList = ({ insurance, contract, accounts, accountId }) => {
  return (
    <div>
      {insurance && insurance.length &&
        insurance.map((doctor, index) => {
          return <div key={index} className='row'>
            <div className='col-lg-2 m-1'><b>{insurance.name}</b></div>
            <div className='col-lg m-1'>{accounts[insurance.account]}</div>
            <div className='col-lg-2 m-1'>
              <InsuranceAccessButton
                insurance={insurance}
                contract={contract}
                accounts={accounts}
                accountId={accountId}>
              </InsuranceAccessButton>
            </div>
          </div>
        })}
    </div>
  )
}

export default InsuranceList;