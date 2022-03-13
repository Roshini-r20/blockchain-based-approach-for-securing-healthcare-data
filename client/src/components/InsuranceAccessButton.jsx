import React, { useState } from "react"

const giveAccessToInsurance = async (insuranceAddress, contract, accounts, accountId) => {
  await contract.methods.giveAccessToInsurance(insuranceAddress).send({ from: accounts[accountId], gas: 100000 })
  const permissions = await contract.methods.getInsurancePermissions(insuranceAddress).call({ from: accounts[accountId], gas: 100000 })
  console.log(permissions)
}

const revokeAccessFromInsurance = async (insuranceAddress, contract, accounts, accountId) => {
  const insurancePermissions = await contract.methods.getInsurancePermissions(insuranceAddress).call({ from: accounts[accountId], gas: 100000 })
  insurancePermissions.map(async (address, index) => {
    if (address === accounts[accountId]) {
      await contract.methods.revokeAccessFromInsurance(insuranceAddress, index).send({ from: accounts[accountId], gas: 100000 })
    }
  })
}

const InsuranceAccessButton = ({ insurance, contract, accounts, accountId }) => {
  const [hasAccess, setHasAccess] = useState(insurance.hasAccess)
  return (
    <div>
      {hasAccess &&
        <button className='btn btn-success'
          onClick={() => {
            revokeAccessFromInsurance(accounts[insurance.account], contract, accounts, accountId)
            setHasAccess(false)
          }}>
          Revoke Access
        </button>
      }
      {!hasAccess &&
        <button className='btn btn-warning'
          onClick={() => {
            giveAccessToInsurance(accounts[insurance.account], contract, accounts, accountId)
            setHasAccess(true)
          }}>
          Give Access
        </button>
      }
    </div >
  )
}

export default InsuranceAccessButton;