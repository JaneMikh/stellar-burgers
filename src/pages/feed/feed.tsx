import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useEffect, FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrderInfo } from '../../services/slices/feed-slice';
import { getFeedsList } from '../../services/actions/feedActions';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrderInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsList());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeedsClick = () => {
    dispatch(getFeedsList());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeedsClick} />;
};
