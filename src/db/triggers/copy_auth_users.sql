-- inserts a row into public.users
create or replace function public.copy_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (external_id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.copy_new_user();
