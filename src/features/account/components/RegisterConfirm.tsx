import { Box, TextField, Typography } from '@mui/material';
import { selectBasicInfo } from '../registerSlice';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import UploadAvatars from '@utils/components/UploadAvatars';

// 递归函数，用于深度遍历对象
// const renderNestedInfo = (obj: Record<string, any>, prefix = '') => {
//   return Object.entries(obj).flatMap(([key, value]) => {
//     const fullKey = prefix ? `${prefix}.${key}` : key;
//     if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//       return renderNestedInfo(value, fullKey);
//     }
//     return (
//       <div className='self-center'>
//         <Typography variant='h5' className='mb-4' key={fullKey}>
//           {t(fullKey)}: {value}
//         </Typography>
//       </div>
//     );
//   });
// };

export const RegisterConfirm = () => {
  const basicInfo = useSelector(selectBasicInfo);

  const { t } = useTranslation();
  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        <UploadAvatars />
        {/* {renderNestedInfo(basicInfo)} */}
      </Box>
    </>
  );
};
