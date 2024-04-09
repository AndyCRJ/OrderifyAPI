import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Modal from '../../Components/Modal/Modal';
import Loader from '../../Components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import useDialog from '../../Hooks/useDialog';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Form from '../../Components/Form/Form';
import i18next from 'i18next';

const myObject = {
  key: i18next.t("navbar.account")
}

export default function Home() {

  const { t } = useTranslation()

  const { user, getAccessTokenSilently } = useAuth0()
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [apps, setApps] = useState([]);

  const [isOpen, openModal, closeModal] = useDialog()

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim("The name doesn't must have white spaces")
        .strict(true)
        .min(5, 'The name of the app must be 5 characters at least')
        .max(25, 'The name of the app must be 25 characters or less')
        .required('To add a new app please give it a name or a correct name')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)

      closeModal()
      setTimeout(() => resetForm(), 300);
    }
  })
  
  useEffect(() => {
    //GETTING THE APP's FROM THE BACKEND
    setLoading(true);
    (async () => {
      const token = await getAccessTokenSilently()
      console.log(token)
    })();
    setLoading(false)
  }, []);

  return (
    <div className='w-full gap-3 h-full flex flex-col'>
      <div className='w-full flex items-center justify-center'>
        <p className='text-3xl'>{t("home.Welcome")} <b>Orderify</b></p>
      </div>
      <div className='w-full h-full gap-5 flex flex-col'>
        {
          loading ?
          <div className='w-full h-full flex justify-center items-center'>
            <Loader width="15rem"/>
          </div>
          :
          <>
            <div className='w-full flex justify-end px-10'>
              <button onClick={openModal} className='button button-secondary'><i className='fas fa-plus mr-2'></i>{t("home.NewAppButton")}</button>
              <Form/>
              <Modal panelClassName="w-[45%]" isOpen={isOpen} closeModal={closeModal}>
                {/* <form autoComplete='off' onSubmit={formik.handleSubmit} className='flex flex-col gap-5 items-center justify-center'>
                  <div className='flex w-full mb-5 relative items-center justify-center'>
                    <h3 className='text-2xl font-semibold leading-6 text-dark dark:text-white'>
                      Create new app
                    </h3>
                    <button onClick={closeModal} className='absolute scapeDefault h-fit top-0 right-2 active:scale-90 transition-all ease-in-out duration-100'><i className='fas fa-xmark text-xl'></i></button>
                  </div>

                  <div className='flex text-center'>
                    <p>Please enter the identifier for your app, once created, you'll be able to setting it up and then you will be able to acces to the main API</p>  
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <div className='flex flex-col w-full gap-2'>
                      <div className='flex items-center text-lg'>
                        <label htmlFor='name' className=''>Name</label><i className='fas fa-asterisk ml-1 text-xs'></i>
                      </div>
                      <div>
                        {
                          formik.touched.name && formik.errors.name ?
                          <p className={`text-sm${formik.errors.name ? ' text-error' : ''}`}>
                            {formik.errors.name}
                          </p> : null
                        }
                      </div>
                      <input
                        autoComplete='off'
                        id='name'
                        name='name'
                        className={`input scapeDefault${formik.errors.name ? ' input-error' : ''}`}
                        type='text'
                        {...formik.getFieldProps("name")}
                      />
                    </div>
                  </div>


                  <div className="flex relative w-full mt-4 items-center justify-center">
                    <button type="submit" className="button button-primary font-semibold">
                      <i className='fas mr-1 fa-box'></i> Register new app
                    </button>
                    {
                      formLoading ?
                      <div className='absolute right-4'>
                        <Loader width="3rem"/>
                      </div> : null
                    }
                  </div>
                </form> */}

                <Form className='gap-5' autoComplete="off" onSubmit={formik.handleSubmit}>
                  <Form.Header className='mb-5'>
                    <h3 className='text-2xl font-semibold leading-6 text-dark dark:text-white'>
                      Create new app
                    </h3>
                  </Form.Header>
                  <Form.Body>
                    <Form.Field className='gap-2' error={formik.errors.name} touched={formik.touched.name} formikFieldProps={formik.getFieldProps('name')} fieldInfo={{
                        autoComplete: "off",
                        className: "",
                        label: "Name",
                        id: "name",
                        name: "name",
                        formElement: "input",
                        required: true
                      }}
                    />
                  </Form.Body>
                  <Form.Footer submitButtonText='Register new app' buttonStyleClass='button-primary' iconClass='fas mr-1 fa-box' formLoading={formLoading}/>
                </Form>
              </Modal>
            </div>
            {
              apps.length == 0 ?
              <div className='w-full h-full flex justify-center items-center'>
                <div className='w-fit h-fit box-border px-6 py-4'>
                  <div className='flex flex-col gap-1 justify-center items-center'>
                    <div className='flex text-3xl mb-2'>
                      <i className='fas fa-boxes mr-2'></i>
                    </div>
                    <p className='text-2xl font-medium'>{t("home.WithoutAppsText.p1")}</p>
                    <p className='text-lg'>{t("home.WithoutAppsText.p2")} <b>{t("home.WithoutAppsText.newApp")}</b></p>
                  </div>
                </div>
              </div>
              :
              <>
                <div className='w-full flex flex-col justify-center items-start px-10'>
                  <p className='text-2xl mb-1 font-semibold'>Applications</p>
                  <p className='text-md'>You can click the app cards to start setting up them</p>
                </div>
                <div className='w-full flex flex-col'>
                  {/* LIST OF USER APPS */}
                </div>
              </>
            }
          </>
        }
      </div>
    </div>
  )
}
