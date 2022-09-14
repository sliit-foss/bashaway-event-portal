import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as _ from 'lodash'
import { register } from '../services/auth'
import { Button, Input } from '../components/common'
import Layout from '../components/layout'
import { getRegexPatternFromKey } from '../helpers'
import Terms from '../components/register/terms'

const steps = [
  {
    name: 'Team',
    gradientColor1: '#7928CA',
    gradientColor2: '#4700DE',
  },
  {
    name: '1st Member',
    gradientColor1: '#007CF0',
    gradientColor2: '#00DFD8',
  },
  {
    name: '2nd Member',
    gradientColor1: '#007CF0',
    gradientColor2: '#00DFD8',
  },
  {
    name: '3rd Member',
    gradientColor1: '#7928CA',
    gradientColor2: '#4700DE',
  },
  {
    name: '4th Member',
    gradientColor1: '#7928CA',
    gradientColor2: '#4700DE',
  },
]

const Register = () => {
  const totalSteps = 5

  const [step, setStep] = useState(1)

  const [modalVisibility, setModalVisibility] = useState(false)

  const navigate = useNavigate()

  const [formData, setFormData] = useState(
    [1, 2, 3, 4, 5].reduce((acc, curr, index) => {
      if (index === 0) {
        acc[1] = {
          name: '',
          email: '',
          password: '',
          university: '',
        }
        return acc
      }
      acc[index + 1] = {
        name: '',
        email: '',
        phone: '',
        academic_year: '',
      }
      return acc
    }, {}),
  )

  const handleSubmit = async (e, isConfirmation) => {
    e?.preventDefault()
    if (step === totalSteps) {
      if (isConfirmation) {
        await register({
          name: formData[1].name,
          email: formData[1].email,
          password: formData[1].password,
          university: formData[1].university,
          members: Object.values(formData)
            .slice(1)
            .filter((member) => !!member.name),
        }).then((res) => {
          if (res.success) {
            toast.success(res.message, {
              autoClose: 3500,
            })
            setTimeout(() => {
              navigate('/login')
            }, 3500)
          }
        })
      } else {
        setModalVisibility(true)
      }
    } else {
      setStep(step + 1)
    }
  }

  return (
    <Layout title="Register | Bashaway">
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full flex flex-col justify-center items-center lg:items-center pt-14">
          <div className="w-full md:w-3/4 xl:w-1/2 flex flex-wrap justify-evenly items-center mb-12">
            {steps.map((list, index) => {
              return (
                <div className="w-2/12 grow">
                  <div className="w-full mb-10">
                    <div className={`relative flex justify-center items-center h-1`} style={{ backgroundImage: `linear-gradient(to right, ${step >= index + 1 ? list.gradientColor1 : '#888888'}, #888888)` }}>
                      <div className="absolute w-6 md:w-10 h-6 md:h-10 rounded-full left-0" style={{ backgroundImage: `linear-gradient(to right, ${step >= index + 1 ? list.gradientColor1 : '#888888'}, ${step >= index + 1 ? list.gradientColor2 : '#888888'})` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="hidden md:block text-sm text-white text-left font-semibold">{list.name}</span>
                    <span className="hidden md:block text-red-500 text-sm ml-2">{index <= 1 ? '*' : ''}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col w-full md:w-3/4 xl:w-1/2">
            <form className="flex flex-col items-end" onSubmit={handleSubmit}>
              {Object.keys(formData).reduce((acc, curr, index, arr) => {
                acc = [
                  ...acc,
                  ...Object.keys(formData[arr[index]]).map((key, i) => {
                    const show = index + 1 == step
                    const required =
                      show &&
                      (step <= 2 ||
                        Object.keys(formData[step]).find((memberKey) => {
                          return formData[step][memberKey] !== ''
                        }))
                    return (
                      <Input
                        key={`${key}-${index},${i}`}
                        placeholder={`${key === 'name' && step === 1 ? 'Team Name' : _.startCase(key)}${required ? ' *' : ''}`}
                        type={key === 'password' || key === 'email' ? key : 'text'}
                        pattern={getRegexPatternFromKey(key).regex}
                        title={getRegexPatternFromKey(key).title}
                        name={key}
                        className={`p-4 my-4 transition duration-300 ${show ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [step]: {
                              ...formData[step],
                              [key]: e.target.value,
                            },
                          })
                        }}
                        required={required}
                      />
                    )
                  }),
                ]
                return acc
              }, [])}
              <span className="text-gray-light mt-6">
                * From 2<sup>nd</sup> member onwards please fill all fields or leave all fields empty
              </span>
              <div className="flex">
                {step !== 1 && (
                  <Button
                    className="w-[110px] sm:w-[165px] h-10 sm:h-11 mt-10 text-black mr-5"
                    type="button"
                    onClick={() => {
                      setStep(step - 1)
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button className="w-[110px] sm:w-[165px] h-10 sm:h-11 mt-10 text-black" type="submit" data-modal-toggle="terms-and-conditions">
                  {step === totalSteps ? 'Register' : 'Next'}
                </Button>
              </div>
            </form>
            <Terms show={modalVisibility} setShow={setModalVisibility} onConfirm={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register
