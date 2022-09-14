import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GoSync, GoKey } from 'react-icons/go'
import * as _ from 'lodash'
import { Button, Input } from '../components/common'
import Layout from '../components/layout'
import { getCurrentUser } from '../services/auth'
import { updateUser } from '../services/user'
import { getRegexPatternFromKey } from '../helpers'
import useEffectOnce from '../hooks/useEffectOnce'
import { setUser } from '../store/user'

const Register = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [formData, setFormData] = useState(user)

  useEffectOnce(() => {
    getCurrentUser().then((res) => {
      dispatch(setUser(res.data))
    })
  })

  useEffect(() => {
    const userData = { ...user }
    if (userData.members) {
      const memberCount = userData.members.length
      for (let i = 0; i < 4 - memberCount; i++) {
        userData.members = [
          ...userData.members,
          {
            name: '',
            email: '',
            phone: '',
            academic_year: '',
          },
        ]
      }
    }
    setFormData(userData)
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateUser(user._id, {
      name: formData.name,
      university: formData.university,
      members: formData.members.filter((member) => !!member.name),
    }).then((res) => {
      if (res.success) {
        dispatch(setUser(formData))
        toast.success('Team details updated successfully', {
          autoClose: 3500,
        })
      }
    })
  }

  return (
    <Layout title="Profile | Bashaway">
      <form className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12" onSubmit={handleSubmit}>
        <div className="h-full flex flex-col w-full md:w-10/12 justify-center items-center pt-28">
          <Input
            placeholder="Team Name"
            name="name"
            className={`p-4 transition duration-300 opacity-100 block mb-12`}
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }}
          />
          <Input
            placeholder="University"
            name="university"
            className={`p-4 transition duration-300 opacity-100 block mb-12`}
            value={formData.university}
            onChange={(e) => {
              setFormData({
                ...formData,
                university: e.target.value,
              })
            }}
          />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-28">
            {formData.members?.map((member, index) => {
              return (
                <div className="flex flex-col gap-5 bg-profile-card backdrop-blur-[5px] rounded-xl p-6 border border-white/10">
                  {Object.keys(member).map((key) => {
                    return (
                      <Input
                        key={`${key}-${index}-profile`}
                        placeholder={_.startCase(key)}
                        pattern={getRegexPatternFromKey(key).regex}
                        title={getRegexPatternFromKey(key).title}
                        name={key}
                        className={`p-4 transition duration-300 opacity-100 block`}
                        value={member[key]}
                        type={key === 'password' || key === 'email' ? key : 'text'}
                        onChange={(e) => {
                          const members = [...formData.members]
                          members.splice(index, 1, {
                            ...members[index],
                            [key]: e.target.value,
                          })
                          setFormData({
                            ...formData,
                            members,
                          })
                        }}
                        required={!!Object.keys(formData.members[index]).find((k) => formData.members[index][k] !== '')}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="sticky mb-20 left-[93%] flex">
          <Button
            className="p-5 mr-8"
            type="button"
            style={{ borderRadius: '100%' }}
            onClick={() => {
              navigate('/change-password')
            }}
          >
            <GoKey className="w-[3.1rem] h-[3rem]" />
          </Button>
          <Button className="p-4 animate-spin" type="submit" style={{ borderRadius: '100%' }}>
            <GoSync className="w-14 h-14" />
          </Button>
        </div>
      </form>
    </Layout>
  )
}

export default Register
