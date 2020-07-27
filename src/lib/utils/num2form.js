/**
* https://wp-kama.ru/id_8475/poleznye-php-kody-dlya-opytnyh.html/comment-page-1#kak-razbit-predlozhenie-na-slova-v-php
*
* Использование:
*
at_num_form2(
  get_comments_number(),
  // варианты написания для количества 1, 2 и 5
  array( 'опубликован', 'опубликовано', 'опубликовано' ),
  array( 'комментарий', 'комментария', 'комментариев' )
);
*
*/
export function num2form2(num, $before, $after) {
  const $cases = [2, 0, 1, 1, 1, 2];
  return `${$before[num % 100 > 4 && num % 100 < 20 ? 2 : $cases[Math.min(num % 10, 5)]]} ${String(
    num,
  )} ${$after[num % 100 > 4 && num % 100 < 20 ? 2 : $cases[Math.min(num % 10, 5)]]}`;
}

/**
* Функция склонение после числительных
*
* Использование:
*
$array = array(1, 2, 5);
	foreach($array as $num){
	echo at_num_form($num, "день", "дня", "дней") . "<br>";
}

1 день
2 дня
5 дней

*/
export function num2form(num, forma1, forma2, forma3) {
  let forma;
  if (num === 0) forma = forma3;
  else if (num >= 5 && num <= 20) forma = forma3;
  else if (/[056789]$/.test(String(num))) forma = forma3;
  else if (/[1]$/.test(String(num))) forma = forma1;
  else if (/[234]$/.test(String(num))) forma = forma2;

  return `${num} ${forma}`;
}
