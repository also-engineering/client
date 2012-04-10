watch ( '.*\.coffee$' ) { |match|
  puts "\nCompiling:\t\t#{match}"
  result = `coffee --bare --compile #{match} 2>&1`
  if result.index "In"
    `growlnotify -t "CoffeeScript error" -m "#{result}"`
    puts "\n\nCoffeescript error\n******************\n#{result}"
  else
    docco_result = `docco #{match}`
    puts "\nDocco-menting:\t\t#{match}\n"
    `couchapp push`
  end
}

watch ( '.*\.less$' ) { |match| 
  puts "\nCompiling:\t\t#{match}"
  result = `lessc #{match} > #{match}.css`
  if result.index "error"
    `growlnotify -t "LESS error" -m "#{result}"`
    puts "\n\nLESS error\n******************\n#{result}"
  else
    `couchapp push`
  end
}

watch ( '.*\.css$|.*\.js$|.*\.html$|.*\.json$' ) { |match| 
  puts "\nUpdating:\t\t#{match}\nPushing to couchapp\n\n"
  `couchapp push`
}




