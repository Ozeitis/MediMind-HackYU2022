import React, { useState } from 'react';
import { TextInput, Title, PasswordInput, Button, Group, Box, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import {login} from "./auth"

function Login() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            doctor: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const onLoginSubmit = (e)=>{
        let opts = {
            'email': e.email,
            'password': e.password,
            'is_doctor': e.doctor
        }
        console.log("opts", opts);
        fetch('http://127.0.0.1:5000/api/login', {
          method: 'POST',
          body: JSON.stringify(opts)
        }).then(r => r.json())
          .then(token => {
            if (token.access_token){
              login(token)
              console.log(token)       
            }
            else {
              console.log("Please type in correct username/password")
            }
          })
    }

    return (
        <Box sx={{ maxWidth: 300, }} style={{ textAlign: 'left' }} mx="auto">
            <Title align='center' style={{ margin: 10 }}>Log In</Title>
            <form onSubmit={form.onSubmit((values) => onLoginSubmit(values))}>
                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    type={'password'}
                    {...form.getInputProps('password')}
                />

                <Checkbox
                    mt="md"
                    label="I am a Doctor"
                    {...form.getInputProps('doctor', { type: 'checkbox' })}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Log In</Button>
                </Group>
            </form>
        </Box>
    );
}

function CreateAccount() {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            doctor: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => (/(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value) ? null : 'Invalid phone number'),
            confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
        },
    });

    const onAccountSubmit = (e)=>{
        console.log("You pressed create account")
        let opts = {
            'firstName': e.firstName,
            'lastName': e.lastName,
            'email': e.email,
            'phone': e.phone,
            'password': e.password,
            'is_doctor': e.doctor
        }
        console.log("opts", opts);
        fetch('http://127.0.0.1:5000/api/register', {
          method: 'post',
          body: JSON.stringify(opts)
        }).then(r => r.json())
          .then(token => {
            if (token.access_token){
              login(token)
              console.log(token)
            }
            else {
              console.log("Please type in correct username/password")
            }
          })
    }

    return (
        <Box sx={{ maxWidth: 300, }} style={{ textAlign: 'left' }} mx="auto">
            <Title align='center' style={{ margin: 10 }}>Create Account</Title>
            <form onSubmit={form.onSubmit((values) => onAccountSubmit(values))}>
                <TextInput
                    label="First Name"
                    placeholder="First Name"
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    {...form.getInputProps('lastName')}
                />

                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    label="Phone Number"
                    type='tel'
                    
                    placeholder="(123) 456-7890"
                    {...form.getInputProps('phone')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    type={'password'}
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Password"
                    type={'password'}
                    {...form.getInputProps('confirmPassword')}
                />

                <Checkbox
                    mt="md"
                    label="I am a Doctor"
                    {...form.getInputProps('doctor', { type: 'checkbox' })}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Create Account</Button>
                </Group>
            </form>
        </Box>
    );
}

export default function SignOnPage() {

    const [newUser, setNewUser] = useState(false);

    return (
        <Box sx={{ maxWidth: 300, }} style={{ textAlign: 'left' }} mx="auto">
            {newUser ? <CreateAccount /> : <Login />}
            <Group position="right" mt="md">
                <Button variant="subtle" color="gray" onClick={() => setNewUser(!newUser)}> {newUser ? 'Existing User?' : "Create New Account"} </Button>
            </Group>
        </Box>
    );
}
