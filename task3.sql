select
  NAME as broker_name,
  customer_nb
from
  BROKER b
  left join (
    select
      BROKER_ID,
      count(*) as customer_nb
    from
      CUSTOMER c
    group by
      BROKER_ID
    order by
      count(*) desc
  ) c on c.BROKER_ID = b.ID
order by
  customer_nb desc,
  broker_name asc