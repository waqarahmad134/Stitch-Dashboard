import React from 'react';
import axios from 'axios';
import GetAPI from '../utilities/GetAPI';
import { BASE_URL } from '../utilities/URL';
import DefaultLayout from '../layout/DefaultLayout';
import TableThree from '../components/Tables/TableThree';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { error_toaster, info_toaster } from '../utilities/Toaster';

export default function Products() {
  const { data , reFetch } = GetAPI('admin/get_products');
  function handleClick(id) {
    axios.get(BASE_URL + `admin/updateProductStatus/${id}`).then((dat) => {
      reFetch();
      console.log(dat?.data);
      if (dat?.data?.status === '1') {
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }
  function updateFeatured(id) {
    axios.get(BASE_URL + `admin/updateFeatured/${id}`).then((dat) => {
      reFetch();
      console.log(dat?.data);
      if (dat?.data?.status === '1') {
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Products" />
      <div className="flex flex-col gap-10">
        <TableThree updateFeatured={updateFeatured} onClick={handleClick} data={data?.data?.data} />
      </div>
    </DefaultLayout>
  );
}
