import { Button } from '../UI/Button'

const home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Button onClick={() => window.location.href = '/calculator'}>
            Calculator
        </Button>
        <Button onClick={() => window.location.href = '/smartcalculator'}>
          Calculator Smart
        </Button>
    </div>
  )
}

export default home