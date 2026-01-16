import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import AuthHOC from './AuthHOC'

const UpdateUser = () => {
  return (
    <section>
        <div className="container">
            <h2 className="text-2xl font-bold mb-4">Update User Information</h2>
            <form className="space-y-4">
                <div className='mb-3'>
                    <Label>Username</Label>
                    <Input type="text" name="username" placeholder="New Username" />
                </div>
            </form>
        </div>
    </section>
  )
}

export default AuthHOC(UpdateUser)
