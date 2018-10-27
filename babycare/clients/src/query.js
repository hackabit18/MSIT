import gql from 'graphql-tag';

export const getAllBMI = gql`{
    BMI(order_by: [BMI_BMI_asc,BMI_id_desc]){
        BMI_id
        BMI_foods
        BMI_BMI
        BMI_IMG
    }
}`;
