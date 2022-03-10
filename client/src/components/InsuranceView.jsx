import React, { useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import PatientsOverview from "./PatientsOverview"

const InsuranceView = ({ contract, accounts, accountId }) => {
  const insuranceViewRef = useRef()
  useEffect(() => {
    const patients = []
    const buildPatientsOverview = async () => {
      const insurancePermissions = await contract.methods.getDoctorsPermissions(accounts[accountId]).call({ from: accounts[accountId], gas: 100000 })
      const seenAddresses = []
      insurancePermissions.map(async (address, _) => {
        if (!seenAddresses.includes(address)) {
          seenAddresses.push(address)
          const documents = await contract.methods.getDocuments(address).call({ from: accounts[accountId], gas: 100000 })
          patients.push({address: address, documents: documents})
        }
      })
    }
    buildPatientsOverview()
    setTimeout(() => {
      ReactDOM.render(
        <PatientsOverview patients={patients} insuranceAddress={accounts[accountId]}></PatientsOverview>,
        insuranceViewRef.current
      )
    }, 500
    )
  /* eslint-disable-next-line */
  }, [])
  return (
    <div ref={insuranceViewRef}></div>
  )
}

export default InsuranceView;