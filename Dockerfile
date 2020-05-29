FROM jenkins/jnlp-slave

USER root

# Install Node
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh

# Install Chrome Browser
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list

RUN apt-get update && apt-get install -y google-chrome-stable

# Install Clever Tools
RUN \ 
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys "379CE192D401AB61" && \
  echo "deb https://dl.bintray.com/clevercloud/deb stable main" | tee -a /etc/apt/sources.list

RUN apt-get update && apt-get install -y clever-tools

USER jenkins
